import React from 'react'

const Card = ({challenge,description}) => {
  return (
    <>
        <div style={styles.card}>
            <h1 style={styles.title}>{challenge}</h1>
            <h3 style={styles.description}>Description: {description}</h3>
        </div>
    </>
  )
}
const styles = {
    card: {
      width: "300px",
      height: "auto",
      border: "1px solid black",
      padding: "10px",
      margin: "10px",
      borderRadius: "10px",
    },
    title: {
      color: "black",
      fontSize: "18px",
      fontFamily: "sans-serif", // Corrected property name
    },
    description: {
      color: "black",
      fontSize: "15px",
      fontFamily: "sans-serif", // Corrected property name
    },
  };

