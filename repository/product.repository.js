// import Product from '../database/model/product.js';

// class ProductRepository{
//     getProductsByCategoryNum(){}
//     getProductDetail(){}
//     createProduct(){}
//     updateProduct(){}
//     deleteProduct(){}
// }

// module.exports= ProductRepository;

const Product = require("../database/model/product");

class ProductRepository {
  async createProduct(name, price, category, productImage, storeId) {
    try {
      const existingProduct = await User.findOne({ where: { name } });

      if (existingProduct) {
        return {
          status: 400,
          errorMessage: "이미 사용 중인 상품명입니다.",
        };
      }
      const product = await Product.create({
        name,
        price,
        category,
        productImage,
        storeId,
      });
      return product;
    } catch (error) {
      console.error("상품 등록 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 등록 중 오류가 발생했습니다.",
      };
    }
  }

  async getCategoryProduct(category) {
    try {
      const products = await Product.findAll({
        where: { category },
      });
      return products;
    } catch (error) {
      console.error("카테고리 별 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "카테고리 별 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async getDetailProduct(productId) {
    try {
      const product = await Product.findByPk(productId);
      return product;
    } catch (error) {
      console.error("상품 상세 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 상세 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async updateProduct(productId, storeId, userId) {
    try {
      const [updatedRowsCount, updatedProducts] = await Product.update(
        { storeId, userId },
        { where: { id: productId } }
      );

      if (updatedRowsCount === 0) {
        return {
          status: 400,
          errorMessage: "해당 상품을 찾지 못했습니다.",
        };
      }

      return updatedProducts[0];
    } catch (error) {
      console.error("상품 업데이트 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  async deleteProduct(productId, storeId, userId) {
    try {
      const deletedRowCount = await Product.destroy({
        where: { id: productId, storeId, userId },
      });

      if (deletedRowCount === 0) {
        return {
          status: 400,
          errorMessage: "해당 상품을 찾지 못했습니다.",
        };
      }

      return deletedRowCount;
    } catch (error) {
      console.error("상품 삭제 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 삭제 중 오류가 발생했습니다.",
      };
    }
  }
}
<<<<<<< HEAD
module.exports= ProductRepository;
=======

module.exports = ProductRepository;
>>>>>>> 34935da70365e33919d129ad419cf3e813d959bc
