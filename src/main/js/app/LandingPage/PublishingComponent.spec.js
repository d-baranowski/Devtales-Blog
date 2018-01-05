import "../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import PublishingComponent from "./PublishingComponent"
import { shallow, mount, render } from 'enzyme';

const spyFunction = (calls) => function() {
    calls.push(arguments)
};

describe("The user isn't an admin user", () => {
    const wrapper = mount(<PublishingComponent
        isAdmin={false}
    />);

    it("The component should not render at all since it's only supposed to be visible to admin users",() =>{
        expect(wrapper.html()).toEqual(null);
    })
});

describe("The user is an admin user and the article isn't published", () => {
    const publishFunctCalls = [];
    const publishFunctSpy = spyFunction(publishFunctCalls);
    const article = {
        id: 10,
        publishedDate: 0
    };

    const wrapper = mount(<PublishingComponent
        isAdmin={true}
        article={article}
        publish={publishFunctSpy}
    />);

    it("The component should render",() =>{
        expect(wrapper.find("button").length).toEqual(1);
    });

    it("The component should say Publish",() =>{
        expect(wrapper.find("button").text()).toEqual("Publish");
    });

    it("When I press on the button the publish function is called with parameter equal to article id", () => {
        wrapper.find("button").simulate("click");
        expect(publishFunctCalls.length).toEqual(1);
        expect(publishFunctCalls[0][0]).toEqual(article.id);
    });
});

describe("The user is an admin user and the article is published", () => {
    const hideFunctCalls = [];
    const hideFunctSpy = spyFunction(hideFunctCalls);
    const article = {
        id: 11,
        publishedDate: 432433242
    };

    const wrapper = mount(<PublishingComponent
        isAdmin={true}
        article={article}
        hide={hideFunctSpy}
    />);

    it("The component should render",() =>{
        expect(wrapper.find("button").length).toEqual(1);
    });

    it("The component should say Hide",() =>{
        expect(wrapper.find("button").text()).toEqual("Hide");
    });

    it("When I press on the button the publish function is called with parameter equal to article id", () => {
        wrapper.find("button").simulate("click");
        expect(hideFunctCalls.length).toEqual(1);
        expect(hideFunctCalls[0][0]).toEqual(article.id);
    });
});