import React, { Dispatch, SetStateAction } from "react";
import CustomTag from "../CustomTag";

interface Props {
  tags: TagType[];
  setTags: any;
  setFilter: Dispatch<SetStateAction<string | null>>;
}

const Tags: React.FC<Props> = ({ tags, setTags, setFilter }) => {
  return (
    <div className="flex flex-row gap-[12px]">
      {tags.map((tag: any, index: number) => (
        <CustomTag
          id={tag.id}
          key={index}
          name={tag.name}
          active={tag.active}
          count={tag.count}
          icon={tag.icon}
          onActive={(id: number) => {
            let updatedTags = tags.map((tag: TagType) => {
              if (tag.id === id) {
                setFilter(tag.filterValue);
                return {
                  ...tag,
                  active: true,
                };
              } else {
                return {
                  ...tag,
                  active: false,
                };
              }
            });
            setTags(updatedTags);
          }}
        />
      ))}
    </div>
  );
};

export default Tags;
