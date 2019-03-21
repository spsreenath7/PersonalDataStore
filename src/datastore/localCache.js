import _ from 'lodash';

class LocalCache {
    constructor() {
        this.acts = [] ;
    }

    getAll() {
        return this.acts ;
    }

    populate(acts) {
        this.acts = acts;
    }

    delete(k) {
        _.remove(this.acts, 
            (act) => act.id === k
        );
        
    }
}
export default (new LocalCache() );
