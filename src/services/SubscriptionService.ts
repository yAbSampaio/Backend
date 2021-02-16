import { Response as res } from 'express';
import { getRepository } from 'typeorm';

import Video from '../models/Video';
import UserVideo from '../models/UserVideo';
import User from '../models/User';
import Subscription from '../models/Subscription';

import checkJwt from '../middlewares/checkJwt'

interface Request {
    token: string;
	target_id: string;
}


class SubscriptionService {
	public async execute({ token, target_id }: Request): Promise<object> {
		try {

			const subscriptionRepository = getRepository(Subscription);
			const user_id = checkJwt(token).sub;

            const created_at = new Date();
            const verifySubscribed = await subscriptionRepository
					.findOne({
						where: { user_subscriber: user_id, user_target: target_id }
                    });
            const is_subscribed = verifySubscribed ? true : false;

			// Aqui temos video_id, title, file e description
			if (subscriptionRepository ) {
			
				// const subscriptions = await subscriptionRepository.count({ where: { user_target: owner_id } });

				if (!is_subscribed) {
                    const subs = await subscriptionRepository.save({
                        user_id1 : target_id,
                        user_id2 : user_id,
                        created_at 
                    })
                }else {
					const subs = await subscriptionRepository.delete({
						where: { user_subscriber: user_id, user_target: target_id }
                    });
                }

				// AINDA FALTA AVATAR
				const Data = {
					status: 1
				}


				return Data;

			} else {
				throw new Error("Erro ao resgatar repositório.");
			}
		} catch (err) {
			throw new Error(err);
		}

	}
}

export default SubscriptionService;