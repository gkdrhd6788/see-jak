package com.example.backend.modules.story;

import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.FshadowStoryIdDto;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;

import java.util.List;

@Data
@Builder
@DynamicInsert
public class ContentDto {
    private Long id;
    private String content;

    public static ContentDto of(Content content){
        return ContentDto.builder()
                .id(content.getId())
                .content(content.getContent())
                .build();
    }
}
