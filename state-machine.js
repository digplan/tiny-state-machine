class StateMachine {
    
    instanceid = `${Math.random().toString(36).substring(2, 7).toUpperCase()}-${new Date().toISOString()}`
    states = {}
    data = {}
 
    async start(name) {
        this.checkStateExists (name)
        this.data._currentState = name
        while(this.data._currentState !== 'END') {
            try {
              this.data._currentState = await this.states[this.data._currentState](this.data)
            } catch(e) {
                this.data._currentState = e
            }
            if(this.data._currentState !== 'END') {
                this.checkStateExists (this.data._currentState)
            }
        }
    }

    defineState(name, func) {
        return this.states[name] = func
    }

    checkStateExists(name) {
        if(!Object.keys(this.states).includes(name)) {
            throw new Error (`State ${name} does not exist`)
        }
    }
}

export { StateMachine }
