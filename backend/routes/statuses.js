const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../ExpressError");
const { ensureEditorOrAdmin } = require("../middleware/auth");
const PotentialClient = require("../models/potentialClient");
const addStatusSchema = require("../schemas/addStatusSchema.json");
const editStatusSchema = require("../schemas/editStatusSchema.json");

const route = express.Router();

route.post("/", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addStatusSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    if (req.body.statusId == 1) {
      throw new BadRequestError("Can't change the start date");
    }

    const result = await PotentialClient.addStatusDate(req.body);

    // update client's current status
    let client;
    if (req.body.statusId == 12) {
      client = await PotentialClient.update(result.client_id, {
        current_status: result.status_id,
        is_enrolled: true,
      });
    } else {
      client = await PotentialClient.update(result.client_id, {
        current_status: result.status_id,
      });
    }

    return res.json({ client });
  } catch (e) {
    return next(e);
  }
});

// route.patch("/", ensureEditorOrAdmin, async (req, res, next) => {
//   try {
//     const validator = jsonschema.validate(req.body, editStatusSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map((e) => e.stack);
//       throw new BadRequestError(errs);
//     }
//     const { id, updateDate } = req.body;
//     const result = await PotentialClient.updateStatusDate(id, updateDate);

//     return res.json({ message: "Updated", result });
//   } catch (e) {
//     return next(e);
//   }
// });

route.delete("/:id", ensureEditorOrAdmin, async (req, res, next) => {
  try {
    const id = await PotentialClient.findStatusId(+req.params.id);

    if (id.status_id == 1) {
      throw new BadRequestError("Can't delete the start date");
    }

    const result = await PotentialClient.deleteStatusDate(req.params.id);

    const user = await PotentialClient.getClient(result.client_id);

    if (user.current_status == result.status_id) {
      await PotentialClient.update(user.id, {
        current_status:
          user.status_updated_dates[user.status_updated_dates.length - 1]
            .status_id,
      });
    }

    return res.json({ message: "Deleted", result });
  } catch (e) {
    return next(e);
  }
});
module.exports = route;
