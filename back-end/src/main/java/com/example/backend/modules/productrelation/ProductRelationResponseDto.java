package com.example.backend.modules.productrelation;

import com.example.backend.modules.character.CharacterRequestDto;
import com.example.backend.modules.character.CharacterResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductRelationResponseDto {
    private Long productRelationId;
    private CharacterResponseDto fromCharacter;
    private CharacterResponseDto toCharacter;
    private String productRelationInfo;
    private String sourceHandle;
    private String targetHandle;

    public static ProductRelationResponseDto of(ProductRelation productRelation) {
        return ProductRelationResponseDto.builder()
                .productRelationId(productRelation.getId())
                .productRelationInfo(productRelation.getProductRelationInfo())
                .fromCharacter(CharacterResponseDto.of(productRelation.getFromCharacter()))
                .toCharacter(CharacterResponseDto.of(productRelation.getToCharacter()))
                .build();
    }

}
