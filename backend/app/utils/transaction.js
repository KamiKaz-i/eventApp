import db from "../config/db.config.js";
export const RunInTransaction = async (func) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    const result = await func(dbTransaction);
    await dbTransaction.commit();
    return result;
  } catch (error) {
    await dbTransaction.rollback();
    throw error;
  }
};
