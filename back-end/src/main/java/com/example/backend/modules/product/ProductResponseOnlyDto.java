package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponseOnlyDto {
    private Long productId;
    private String productTitle;
    private String productInfo;
    private String productImageUrl;
    private Category category;

    //플롯 hashset - 스토리까지 todo entitygraph

    public static ProductResponseOnlyDto of(Product product){
        return ProductResponseOnlyDto.builder()
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productInfo(product.getInfo())
                .productImageUrl(product.getProductImageuRL())
                .category(product.getCategory())
                .build();
    }
}
