import showPatternDescription from '../description';

export function State(logger) {
    showDescription();

    const stateManager = new StateManager(logger);

    stateManager.start();
}

class StateManager {
    constructor(logger) {
        this.logger = logger;
        this.count = 0;
        this.currentState = new FirstState(this, logger);
    }

    changeState(state) {
        if (this.count++ >= 10) return;
        this.logger.add(`StateManager: State changed to ${state.name}`);
        this.currentState = state;
        this.currentState.next();
    }

    start() {
        this.currentState.next();
    }
}

class FirstState {
    constructor(manager, logger) {
        this.manager = manager;
        this.logger = logger;
        this.name = 'First state';
    }

    next() {
        const nextState = new SecondState(this.manager, this.logger);
        this.logger.add(`FirstState: Changing state to ${nextState.name}`);
        this.manager.changeState(nextState);
    }
}

class SecondState {
    constructor(manager, logger) {
        this.manager = manager;
        this.logger = logger;
        this.name = 'Second state';
    }

    next() {
        const nextState = new ThirdState(this.manager, this.logger);
        this.logger.add(`FirstState: Changing state to ${nextState.name}`);
        this.manager.changeState(nextState);
    }
}

class ThirdState {
    constructor(manager, logger) {
        this.manager = manager;
        this.logger = logger;
        this.name = 'Third state';
    }

    next() {
        const nextState = new FirstState(this.manager, this.logger);
        this.logger.add(`FirstState: Changing state to ${nextState.name}`);
        this.manager.changeState(nextState);
    }
}

function showDescription() {
    showPatternDescription('State',
        [`The State pattern provides state-specific logic to a limited set of objects in 
        which each object represents a particular state. This is best explained with an example.`,
        `Say a customer places an online order for a TV. While this order is being
         processed it can in one of many states: New, Approved, Packed, Pending, Hold, 
         Shipping, Completed, or Canceled. If all goes well the sequence will be New,
          Approved, Packed, Shipped, and Completed. However, at any point something
        unpredictable may happen, such as no inventory, breakage, or customer cancelation.
            If that happens the order needs to be handled appropriately.`,
        `Applying the State pattern to this scenario will provide you with 8 State objects,
         each with its own set of properties (state) and methods (i.e. the rules of 
        acceptable state transitions). State machines are often implemented using 
        the State pattern. These state machines simply have their State objects
        swapped out with another one when a state transition takes place.`,
        `Two other examples where the State pattern is useful include: vending machines
         that dispense products when a correct combination of coins is entered, and 
         elevator logic which moves riders up or down depending on certain complex rules
          that attempt to minimize wait and ride times.`]
    )
}