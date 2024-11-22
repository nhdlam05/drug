const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Người dùng đặt hàng
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Sản phẩm
        quantity: { type: Number, required: true },  // Số lượng
        price: { type: Number, required: true }      // Giá mỗi sản phẩm
    }],
    totalAmount: { type: Number, required: true },   // Tổng giá trị đơn hàng
    status: { type: String, default: 'Pending' },    // Trạng thái đơn hàng (Pending, Shipped, Delivered, Canceled)
    address: { type: String, required: true },       // Địa chỉ giao hàng
    paymentMethod: { type: String, default: 'COD' }, // Phương thức thanh toán (COD, Online Payment)
    paymentStatus: { type: String, default: 'Pending' },  // Trạng thái thanh toán (Pending, Completed, Failed)
    paymentDate: { type: Date, default: Date.now },      // Ngày thanh toán
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
