import _ from 'lodash';
import request from 'superagent';

class ActivityAPI {
    constructor() {
        this.activities = [];
        // this.activities = [
        //     {
        //         'title': 'DMK led alliance will win in TN, Puducherry: MDMK Chief ',
        //         'url': 'www.facebook.com',
        //         'date': '19/03/2019',
        //         'privacy': 'success',
        //         'catogery': 'Social'
        //     },        
        //     {
        //         'title': 'CK Kumaravel of Naturalsquits Kamal Haasan',
        //         'url': 'www.google.com',
        //         'date': '11/09/2018',
        //         'privacy': 'info',
        //         'catogery': 'Utility'
        //     }, 
        //     {
        //         'title': 'pollachi News in Tamil thirumavalavan to stage protest Tamil news live',
        //         'url': 'www.youtube.com',
        //         'date': '19/03/2018',
        //         'privacy': 'dark',
        //         'catogery': 'Social'
        //     },
        //     {
        //         'title': 'Random Title 1',
        //         'url': 'www.facebook.com/user1',
        //         'date': '15/03/2018',
        //         'privacy': 'info',
        //         'catogery': 'Utility'
        //     },
        //     {
        //         'title': 'Random Title 1',
        //         'url': 'www.google.com/react',
        //         'date': '10/06/2017',
        //         'privacy': 'success',
        //         'catogery': 'Utility'
        //     }
        // ] ; 
    }

    populate()
    {
        request.get('http://localhost:3001/acts')
        .end((error, res) => {
            if (res) {
                let acts = JSON.parse(res.text);
                // localCache.populate(friends);
                this.activities=acts;
                console.log(this.activities);
            } else {
                console.log(error);
            }
        });
        console.log("After populate :");
        console.log(this.activities);
    }

    delete(k) {

        this.populate();
        let delindex = _.findIndex(this.activities, 
            (act) => act.url === k
        );
        console.log("item to be deletd "+this.activities[delindex]);
        let deleteurl='http://localhost:3001/acts/'+this.activities[delindex].id;
        console.log(deleteurl);
        request.delete(deleteurl).end((error, res) => {
            if (res) {
                console.log("success!");
            } else {
                console.log(error);
            }
        });
        this.populate();
    }

    getAll() {
        
        
        return this.activities ;
    }

    add(t,u,d,c,p) {
        this.populate();
        let actid = _.maxBy(this.activities, 'id').id ;
        
        console.log("Add Item : "+actid);
        actid=actid+1;
        request.post('http://localhost:3001/acts').send({
            id: actid,
            title: t,
            url: u,
            date: d,
            catogery: c,
            privacy: p
        }).end((error, res) => {
            if (res) {
                console.log("Success");
            } else {
                console.log(error);
            }
        });
        this.populate();

    }

    update(key,t,u,d,c,p) {
        this.populate();
        let index = _.findIndex(this.activities, 
            (act) => act.url === key
        );      
        let updatid=this.activities[index].id;
        let updateurl='http://localhost:3001/acts/'+updatid;
        request.put(updateurl).send({
            id: updatid,
            title: t,
            url: u,
            date: d,
            catogery: c,
            privacy: p
        }).end((error, res) => {
            if (res) {
                console.log("success!");
            } else {
                console.log(error);
            }
        });
        this.populate();
    }
}

export default (new ActivityAPI() );