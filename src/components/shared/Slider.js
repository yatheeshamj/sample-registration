import "./Slider.module.scss";
import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = ({ items, interval }) => {
  return (
    <Carousel interval={interval}>
      
      {items.map((o) => {
        return (
          <Carousel.Item key={o.crmId}>
            <div dangerouslySetInnerHTML={{ __html: o.htmlContent }} />
          </Carousel.Item>
        );
      })}
       
    </Carousel>
  );
};

export default Slider;
