import React from 'react';
import Card from "react-bootstrap/Card";
import Skeleton from "@mui/material/Skeleton";

export default function ProductsSkeleton(){
  return (
      <>
        {[...Array(4)].map((_, index) => (
            <Card key={index} style={{width: '17rem', margin: '10px', height: '25rem'}}>
              <Skeleton variant="rectangular" height={150}/>
              <Card.Body>
                <Skeleton variant="text"/>
                <Skeleton variant="text" width="60%"/>
                <Skeleton variant="text"/>
              </Card.Body>
            </Card>
        ))}
      </>
  );
}