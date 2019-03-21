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

    add(newact) {
        
        this.acts.push(newact);
    }

    update(updatedact) {
        let index = _.findIndex(this.acts, 
            (act) => act.id === updatedact.id
        );      
        if (index !== -1) {
            this.acts.splice(index, 1, 
                {
                    id: updatedact.id,
                    title: updatedact.title,
                    url: updatedact.url,
                    date: updatedact.date,
                    catogery: updatedact.catogery ,
                    privacy: updatedact.privacy 
                }) ;
            return true ;
        }
        return false ;
    }
}
export default (new LocalCache() );
