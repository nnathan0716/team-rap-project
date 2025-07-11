import React from "react";
import ProductCard from "./ProductCard";

const Recommended = ({ recommendedItems }) => {
  return (
    <div style={styles.recommendationContainer}>
      {recommendedItems.map((item) => (
        <ProductCard data={item} key={item.name} />
      ))}
    </div>
  );
};

const styles = {
  recommendationContainer: {
    display: "flex",
    flexWrap: "wrap", // Allows items to wrap to the next line if necessary
    justifyContent: "space-around", // Adjusts spacing between items
    gap: "16px", // Adds space between items
  },
};

export default Recommended;
