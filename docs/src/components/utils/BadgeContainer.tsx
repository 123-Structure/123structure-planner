import React from "react";

interface IBadgeContainer {
  tags: string[];
}

const BadgeContainer = (props: IBadgeContainer) => {
  return (
    <div>
      {props.tags.map((tag) => (
        <span
          className="badge badge--primary"
          style={{
            margin: "1rem 0",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default BadgeContainer;
