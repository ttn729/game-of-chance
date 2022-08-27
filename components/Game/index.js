import { Button, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

const MAX_NUM = 100;

// return a random integer between 0 and MAX_NUM
const getRandomNum = () => {
    return Math.floor(Math.random() * (MAX_NUM + 1));
}

export default function Game() {
    const [turn, setTurn] = useState(0);
    const [points, setPoints] = useState(0);
    const [xValue, setxValue] = useState(getRandomNum());
    const [yValue, setyValue] = useState(getRandomNum());
    const [message, setMessage] = useState("");

    const checkHigherLower = (isHigher, xValue, yValue) => {
        const isCorrect = false;

        if (isHigher == "higher") {
            if (yValue >= xValue) {
                isCorrect = true;
            }
        }
        else { // user chose lower
            if (yValue <= xValue) {
                isCorrect = true;
            }
        }
        return isCorrect;
    }

    const onClickHigherLower = (isHigher) => {
        if (turn < 10) {
            setTurn(turn + 1);
            const isCorrect = checkHigherLower(isHigher, xValue, yValue);

            if (isCorrect) {
                setMessage("You are correct! X was " + xValue +  " and the value of Y is " + yValue
                    + ", and so you earn " + yValue + " points.");
                setPoints(points + yValue);
            }
            else { // user guessed wrong
                setMessage("You are incorrect. X was " + xValue +  " and the value of Y is " + yValue
                    + ", and so you earn 0 points.");
            }

            setxValue(getRandomNum());
            setyValue(getRandomNum());
        }
        if (turn == 10) {
            alert("GAME OVER! You won " + points + " points.");
            onClickReset();
        }
    }

    const onClickReset = () => {
        setTurn(0);
        setPoints(0);
        setMessage("");
        setxValue(getRandomNum());
        setyValue(getRandomNum());
    }


    return (
        <Container>
            <Box sx={{ display: "flex" }}>
                <Box>
                    <h1>Turn: {turn} </h1>
                    <h1>Points: {points} </h1>
                </Box>
                <Box sx={{ mx: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h1>X = {xValue}</h1>
                </Box>    
            </Box>


            <Button style={{ backgroundColor: "green" }} variant="Text" id="higher" onClick={() => onClickHigherLower("higher")}>
                Higher
            </Button>
            <Button style={{ backgroundColor: "orange" }} variant="Text" id="lower" onClick={() => onClickHigherLower("lower")}>
                Lower
            </Button>

            <Button style={{ backgroundColor: "red" }} variant="Text" onClick={() => onClickReset()}>
                Reset
            </Button>

            <p>{message}</p>

        </Container>

    )
}