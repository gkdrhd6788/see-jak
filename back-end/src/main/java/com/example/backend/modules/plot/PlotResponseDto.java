package com.example.backend.modules.plot;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlotResponseDto {
    Long plotId;
    String plotName;
    String plotColor;
    //TODO STORY List 가져오기

    public static PlotResponseDto from(Plot plot){
        return PlotResponseDto.builder()
                .plotId(plot.getId())
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .build();
    }
}