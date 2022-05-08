import { useAuthState } from 'react-firebase-hooks/auth';
import React, {useState} from 'react';
import { auth, SignOut, deleteUserDocument } from '../scripts/firebase';
import { useNavigate, NavLink } from 'react-router-dom';

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';

const Profil = (props) => {
    const {userData} = props
    const [user] = useAuthState(auth)
    const [state, setState] = useState(null);
    
    const n = useNavigate();


    const usage = 100
    const radius = 160
    const donutThickness = 30

    const data = [
        {
            color: '#feaac0',
            title: 'Kirby',
            amount: userData?.Kirby ? userData.Kirby : 1,
            image: 'https://firebasestorage.googleapis.com/v0/b/nintenwho.appspot.com/o/kirby-img.png?alt=media&token=7ccceb4c-2c13-4688-bb32-7826c0b96ced'
        },
        {
            color: '#dd0010',
            title: 'Mario',
            amount: userData?.Mario ? userData.Mario : 1,
            image: 'https://firebasestorage.googleapis.com/v0/b/nintenwho.appspot.com/o/Mario-PNG-Image.png?alt=media&token=747671ac-94e8-4a57-8103-bebc5918d717'
        },
        {
            color: '#531e0a',
            title: 'Donkey Kong',
            amount: userData?.DK ? userData.DK : 1,
            image: 'https://firebasestorage.googleapis.com/v0/b/nintenwho.appspot.com/o/Donkey-Kong-PNG-Transparent.png?alt=media&token=43143671-de01-4bd2-95ee-a115fc6d063f'
        }
    ]






    const suppresData = async () => {
        await deleteUserDocument()
        window.location = "/ChatRoom"
    }

    return (
        <div className='datas'>
            <div className='infos'>
                {user?.displayName} <SignOut/>
            </div>
            {/* {userData && Object.keys(userData).map((val, i) => {
                if (val === 'valid') return;
                return ( <div key={i} className='perso'>
                    <div className={val + ' img'}></div> <div className='perc'> {userData[val]}% </div>
                </div> )
            })} */}

            <div className='chart'>
                <svg width={radius*2.5} height={radius*2.5}>
                    <Group top={radius*1.25} left={radius*1.25}>
                        <Pie
                            data={data}
                            pieValue={cd => (cd.amount * 100)}
                            outerRadius={radius}
                            innerRadius={radius - donutThickness}
                            padAngle={0.0001}
                        >
                            {pie => {
                                return pie.arcs.map(arc => (
                                    <g
                                        key={arc.data.title}
                                        onMouseEnter={() => setState(arc.data)}
                                    >
                                        <path className='pathpart' d={pie.path(arc)} fill={arc.data.color}/>
                                    </g>
                                ))
                            }}
                        </Pie>
                    </Group>
                </svg>
                {state && <div className="inner">
                    <div>
                        {state?.title}
                    </div>
                    <img src={state?.image} alt="" />
                    <div>
                        {state?.amount}%
                    </div>
                </div>}
            </div>
            {userData ? 
            <button onClick={suppresData}>Supprimer les données</button>
            :
            <NavLink to='/ChatRoom'>Faire le questionnaire</NavLink>
            }
        </div>
    );
};

export default Profil;