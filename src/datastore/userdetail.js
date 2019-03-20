import _ from 'lodash';

class UserdetailAPI {
    constructor() {

        this.users = [
            {
                'userid': 'mark01',
                'name': 'Mark',
                'email': 'random@some.com',
                'gender': 'male',
                'contact': '0810198765'
            },        
            {
                'userid': 'philly07',
                'name': 'Philly',
                'email': 'random1@some.com ',
                'gender': 'female',
                'contact': '0899723765'
            }
        ] ; 
    }

    delete(k) {
        let elements = _.remove(this.users, 
            (user) => user.email === k
        );
        return elements; 
    }

    getUserByEmail(key) {
        let index = _.findIndex(this.users, 
            (user) => user.email === key
        );
        // let user =_.get(this.users, (user) => user.email === key);
        let user = this.users[index];

        return user;
    }

    get(key) {
        let index = _.findIndex(this.users, 
            (user) => user.userid === key
        );
        // let user =_.get(this.users, (user) => user.email === key);
        let user = this.users[index];

        return user;
    }

    getAll() {
        return this.users ;
    }

    add(n,e,g,c) {
        let len = this.users.length ;
        let newLen = this.users.push({
            userid: '',
            name: n,
            email: e,
            gender: g,
            contact: c 
        }) ;
        return newLen > len ;
    }

    update(key,n,e,g,c) {
        let index = _.findIndex(this.users, 
            (user) => user.email === key
        );      
        if (index !== -1) {
            this.users.splice(index, 1, 
                {
                    userid: this.users[index].userid,
                    name: n,
                    email: e,
                    gender: g,
                    contact: c  
                }) ;
            return true ;
        }
        return false ;
    }
}

export default (new UserdetailAPI() );