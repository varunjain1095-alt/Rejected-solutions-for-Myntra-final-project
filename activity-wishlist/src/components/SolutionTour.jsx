import { useMemo } from 'react';
import { Joyride, STATUS, EVENTS } from 'react-joyride';
import { buildTourSteps } from '../data/tours';

export default function SolutionTour({ solution, run, onFinish, prepareStep }) {
  const steps = useMemo(
    () => buildTourSteps(solution, prepareStep),
    [solution, prepareStep]
  );

  const handleEvent = (data) => {
    if (
      data.type === EVENTS.TOUR_END &&
      (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED)
    ) {
      onFinish?.();
    }
  };

  if (!steps.length) return null;

  return (
    <Joyride
      key={solution}
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      scrollOffset={24}
      disableOverlayClose
      onEvent={handleEvent}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Done',
        next: 'Next',
        skip: 'Skip tour',
      }}
      options={{
        skipBeacon: true,
        zIndex: 10050,
        targetWaitTimeout: 5000,
        beforeTimeout: 8000,
        primaryColor: '#ff3f6c',
      }}
      styles={{
        options: {
          primaryColor: '#ff3f6c',
          zIndex: 10050,
        },
        tooltip: {
          fontSize: 14,
          lineHeight: 1.5,
          maxWidth: 380,
        },
        tooltipTitle: {
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 6,
        },
        overlay: {
          zIndex: 10040,
        },
        spotlight: {
          zIndex: 10045,
        },
      }}
    />
  );
}
