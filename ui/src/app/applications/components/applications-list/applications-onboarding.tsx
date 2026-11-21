import * as React from 'react';

import './applications-onboarding.scss';

const steps = [
    {
        title: 'Choose a source',
        description: 'Select a Git repository and path, or a Helm chart. This is the desired state: the configuration Argo CD will compare with your cluster.',
        next: 'Next: choose a destination'
    },
    {
        title: 'Choose a destination',
        description: 'Select the registered cluster and namespace where Argo CD should manage the application.',
        next: 'Next: sync and observe'
    },
    {
        title: 'Sync and observe',
        description:
            'Argo CD compares the desired state with the live cluster. With manual sync, review the difference before applying it. Synced means they match; Healthy describes whether the resources are running as expected.'
    }
];

export const ApplicationsOnboarding = ({onCreateApplication}: {onCreateApplication: () => void}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const step = steps[activeStep];

    return (
        <section className='applications-onboarding' aria-labelledby='applications-onboarding-title'>
            <h4 id='applications-onboarding-title'>Deploy your first application</h4>
            <p className='applications-onboarding__intro'>Follow the GitOps flow: describe what you want, choose where it should run, then compare and sync.</p>
            <ol className='applications-onboarding__steps'>
                {steps.map((item, index) => (
                    <li key={item.title}>
                        <button
                            type='button'
                            className={index === activeStep ? 'applications-onboarding__step applications-onboarding__step--active' : 'applications-onboarding__step'}
                            aria-pressed={index === activeStep}
                            onClick={() => setActiveStep(index)}>
                            <span className='applications-onboarding__step-number'>{index + 1}</span>
                            {item.title}
                        </button>
                    </li>
                ))}
            </ol>
            <div className='applications-onboarding__detail' aria-live='polite'>
                <h5>{step.title}</h5>
                <p>{step.description}</p>
                {step.next ? (
                    <button className='argo-button argo-button--base' onClick={() => setActiveStep(activeStep + 1)}>
                        {step.next}
                    </button>
                ) : (
                    <button qe-id='applications-list-button-create-application' className='argo-button argo-button--base' onClick={onCreateApplication}>
                        Create application
                    </button>
                )}
            </div>
            <a className='applications-onboarding__guide' href='https://argo-cd.readthedocs.io/en/stable/getting_started/' target='_blank' rel='noopener noreferrer'>
                Read the getting started guide
            </a>
        </section>
    );
};
