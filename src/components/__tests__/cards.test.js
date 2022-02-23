import React from "react";
import ReactDOM  from "react-dom";
import Cards from "../cards";

import { render } from "@testing-library/react"

test("Runs without crashing" , () => {
    const div = document.createElement("div")
    ReactDOM.render(<Cards />, div)
})
