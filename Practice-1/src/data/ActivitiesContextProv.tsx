import React, { useState } from 'react';
import ActivitiesContext, { Activity, ActivitiesContextModel, ActivityType } from './activities-context';

const ActivitiesContextProvider: React.FC = (props) => {

    const [activities, setActivities] = useState<Activity[]>([
        {
            id: Math.random().toString(),
            title: 'My daily sleep',
            description: 'Sleep through the night after a day of quarantine',
            hour: '23:00',
            activityType: 'rest',
            imgUrl: '/assets/images/sleep.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Hard work',
            description: 'Work in the projects I have at Tribalyte',
            hour: '9:00',
            activityType: 'work',
            imgUrl: '/assets/images/book.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Play ping pong',
            description: 'Play a ping pong match on the hall table!',
            hour: '19:00',
            activityType: 'hobby',
            imgUrl: '/assets/images/running.jpg',
            isCompleted: false
        }
    ]);

    const addActivity = (title: string, description: string, activityType: ActivityType) => {
        let imgUrl = '';
        switch(activityType) {
            case 'rest':
                imgUrl = '/assets/images/sleep.jpg'
                break;
            case 'hobby':
                imgUrl = '/assets/images/running.jpg'
                break;
            case 'work':
                imgUrl = '/assets/images/book.jpg'
                break;
            default:
                imgUrl = '/assets/images/work.jpg'
                break;
        };

        const activityDate = new Date();
        const hour = activityDate.getHours() + ':' + activityDate.getMinutes();

        const addActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imgUrl,
            isCompleted: false
        };

        setActivities(currActivities => {
            return [...currActivities, addActivity]
        })
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};
            updatedActivities[selectedActivityIndex] = updatedActivity;
            return updatedActivities;
        });
    };

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};

export default ActivitiesContextProvider;