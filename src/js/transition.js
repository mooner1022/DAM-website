import highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

export class Fade extends highway.Transition {
    in({from,to,done}){
        const t1 = new TimelineLite();
        t1.fromTo(to, 0.5, {left:"-100",top:"50%"},{left:"50%"}).fromTo(
            to,
            0.5,
            { height: "2vh" },
            { height: "90vh", top: "10%",
            onComplete: ()=> {
                from.remove();
                done();
            }
        });
    }
    out({from,done}){
        done();
    }
}

export default Fade;