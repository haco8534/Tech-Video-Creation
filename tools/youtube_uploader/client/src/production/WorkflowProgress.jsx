import { CheckIcon } from "../icons";

export default function WorkflowProgress({ workflow }) {
  if (!workflow) return null;

  return (
    <div className="wf-progress">
      {workflow.steps.map((step, i) => {
        const isCurrent = i === workflow.currentStep;
        const isDone = step.completed;

        return (
          <div key={step.key} className="wf-step-wrapper">
            {i > 0 && (
              <div className={`wf-line ${isDone ? "done" : ""}`} />
            )}
            <div
              className={`wf-step ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}
              title={step.label}
            >
              {isDone ? <CheckIcon /> : <span className="wf-step-num">{i + 1}</span>}
            </div>
            <span className={`wf-label ${isCurrent ? "current" : ""}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
