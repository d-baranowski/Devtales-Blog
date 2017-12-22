import React  from "react";
import {CompositeDecorator} from "draft-js";
import {HashtagDecorator} from "./HashtagDecorator";
import {PrismDecorator} from "./PrismDecorator";

export const Decorators = new CompositeDecorator([
    HashtagDecorator,
    PrismDecorator
]);