import React  from "react";
import {CompositeDecorator} from "draft-js";
import {HashtagDecorator} from "./HashtagDecorator/index";
import {PrismDecorator} from "./PrismDecorator/index";

export const Decorators = new CompositeDecorator([
    HashtagDecorator,
    PrismDecorator
]);