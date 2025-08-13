import * as orderService from "../services/order.service.js";

export const getOrder = async (req, res) => {
  try {
    const orders = await orderService.getOrder(req.params.id);
    res.status(200).json(Object.values(orders));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
