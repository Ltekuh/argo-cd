import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ApplicationsOnboarding} from './applications-onboarding';

test('explains each step and creates an application from the final step', () => {
    const onCreateApplication = jest.fn();
    let tree: renderer.ReactTestRenderer;
    renderer.act(() => {
        tree = renderer.create(<ApplicationsOnboarding onCreateApplication={onCreateApplication} />);
    });

    expect(JSON.stringify(tree.toJSON())).toContain('desired state');

    renderer.act(() => {
        tree.root.findAllByType('button')[1].props.onClick();
    });
    expect(JSON.stringify(tree.toJSON())).toContain('registered cluster and namespace');

    renderer.act(() => {
        tree.root.findAllByType('button')[2].props.onClick();
    });
    expect(JSON.stringify(tree.toJSON())).toContain('Synced means they match');

    renderer.act(() => {
        tree.root.findByProps({'qe-id': 'applications-list-button-create-application'}).props.onClick();
    });
    expect(onCreateApplication).toHaveBeenCalledTimes(1);
});
