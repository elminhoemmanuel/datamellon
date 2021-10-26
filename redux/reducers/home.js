import { FETCH, THROW_ERROR, RESET_ERROR, SET_SALES } from "../types"

const initialState = {
    data: [],
    error: "",
    sales14: 0,
    sales15: 0,
    sales16: 0,
    sales17: 0,
    profit14: 0,
    profit15: 0,
    profit16: 0,
    profit17: 0,
    qty14: 0,
    qty15: 0,
    qty16: 0,
    qty17: 0,
};

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH:
            return {
                ...state,
                data: action.payload,

            }
        case SET_SALES:
            let count14 = 0;
            let count15 = 0;
            let count16 = 0;
            let count17 = 0;
            let pr14 = 0;
            let pr15 = 0;
            let pr16 = 0;
            let pr17 = 0;
            let qy14 = 0;
            let qy15 = 0;
            let qy16 = 0;
            let qy17 = 0;

            const yearlySales = (year) => {
                console.log("entered here")
                for (let i = 0; i < state.data.length; i++) {

                    if (state.data[i]["Order Date"].substr(state.data[i]["Order Date"].length - 4) === "2014") {
                        // console.log(Number(state.data[i]["Sales"]))
                        // console.log("entered here 2014")
                        count14 = count14 + Number(state.data[i]["Sales"])
                        pr14 = pr14 + Number(state.data[i]["Profit"])
                        qy14 = qy14 + Number(state.data[i]["Quantity"])
                    }
                    if (state.data[i]["Order Date"].substr(state.data[i]["Order Date"].length - 4) === "2015") {
                        // console.log("entered here 2015")
                        count15 = count15 + Number(state.data[i]["Sales"])
                        pr15 = pr15 + Number(state.data[i]["Profit"])
                        qy15 = qy15 + Number(state.data[i]["Quantity"])
                    }
                    if (state.data[i]["Order Date"].substr(state.data[i]["Order Date"].length - 4) === "2016") {
                        // console.log("entered here 2016")
                        count16 = count16 + Number(state.data[i]["Sales"])
                        pr16 = pr16 + Number(state.data[i]["Profit"])
                        qy16 = qy16 + Number(state.data[i]["Quantity"])
                    }
                    if (state.data[i]["Order Date"].substr(state.data[i]["Order Date"].length - 4) === "2017") {
                        // console.log("entered here 2017")
                        count17 = count17 + Number(state.data[i]["Sales"])
                        pr17 = pr17 + Number(state.data[i]["Profit"])
                        qy17 = qy17 + Number(state.data[i]["Quantity"])
                    }

                }
            }

            yearlySales("2014");
            yearlySales("2015");
            yearlySales("2016");
            yearlySales("2017");

            return {
                ...state,
                sales14: Math.round(count14),
                sales15: Math.round(count15),
                sales16: Math.round(count16),
                sales17: Math.round(count17),
                profit14: Math.round(pr14),
                profit15: Math.round(pr15),
                profit16: Math.round(pr16),
                profit17: Math.round(pr17),
                qty14: Math.round(qy14),
                qty15: Math.round(qy15),
                qty16: Math.round(qy16),
                qty17: Math.round(qy17),

            }
        case THROW_ERROR:
            return {
                ...state,
                error: "Something went wrong, refresh page to try again"
            }
        case RESET_ERROR:
            return {
                ...state,
                error: ""
            }
        default:
            return state;
    }
};