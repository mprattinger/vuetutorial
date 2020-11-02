import TutorialModel from "../models/tutorial.model";

export class TutorialController {
    constructor() { }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    create(req, res) {
        if (!req.body.title) {
            res.status(400).send({ message: "Title cannot be empty!" });
        }

        const tutorial = new TutorialModel({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        });

        tutorial
            .save(tutorial)
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial."
                });
            });
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    findAll(req, res) {
        const title = req.query.title;
        let condition = title ? { title: { $reges: new RegExp(title), $options: "i" } } : {};

        TutorialModel.find(condition)
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials."
                });
            })
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    findOne(req, res) {
        const id = req.params.id;

        TutorialModel.findById(id)
            .then(data => res.send(data))
            .catch(err => {
                res
                    .status(500)
                    .send({ message: "Error retrieving Tutorial with id=" + id });
            });
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    update(req, res) {
        if (!req.body) {
            return res.status(400).send({
              message: "Data to update can not be empty!"
            });
          }
        
          const id = req.params.id;

          TutorialModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data => {
                if(!data) {
                    res.status(404).send({
                        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                      });
                } else res.send({ message: "Tutorial was updated successfully." });
            })
            .catch(err => {
                res.status(500).send({
                  message: "Error updating Tutorial with id=" + id
                });
              });
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    delete(req, res) {
        const id = req.params.id;

        TutorialModel.findByIdAndRemove(id)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            } else {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    deleteAll(req, res) {
        TutorialModel.deleteMany({})
        .then(data => {
          res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
    }

    /**
     * 
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    findAllPublished(req, res) {
        TutorialModel.find({ published: true })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });
    }
}