import React from "react";

import SwaggerUI from "swagger-ui-react";

import { fullRestURL } from "../App";


const SwaggerNakyma = () => {
    const url = `${fullRestURL()}/swagger.json`;
    return (
        <div>
            <SwaggerUI url={url} docExpansion={"none"} />
        </div>
    );
};

export { SwaggerNakyma };
