// Possible general verification

const existModelById = async (Model, id) => {
    const existModelID = await Model.findById(id)
    if (!existModelID) {
        throw new Error(`ID: ${id} in ${Model.modelName} does not exist`)
    }
}

const existModelDB = async (Model, fieldname = '', fieldvalue) => {
    let field = {}
    field[`${fieldname}`] = fieldvalue
    const modelC = await Model.findOne(field).exec()
    if (modelC) {
        throw new Error(`${Model.modelName}: ${fieldvalue} alredy exists`)
    }
}
module.exports = {
    existModelById,
    existModelDB
}
