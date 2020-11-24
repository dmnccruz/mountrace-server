const { AuthenticationError, UserInputError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');

const Screen = require('../../models/Screen');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getScreens() {
            try {
                const screens = await Screen.find().sort({ createdAt: -1 });
                return screens;
            } catch(err){
                throw new Error(err);
            }
        },
        async getScreen(_, { screenId }){
            try {
                const screen = await Screen.findById(screenId);
                if(screen) {
                    return screen;
                } else {
                    throw new Error('Screen not found.')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createScreen(_, { age, address, mobile, temp, travel, symptoms }, context){
            const user = checkAuth(context);
            const user2 = await User.findById(user.id);

            user2.responded = true

            let conditionScreen = ""

            if(travel === "yes" && temp === "38+") {
                user2.condition = "pui"
                conditionScreen = "pui"
            }
            else if(travel === "yes" && temp !== "38+") {
                user2.condition = "pum"
                conditionScreen = "pum"
            }
            else if(travel !== "yes" && symptoms === "") {
                user2.condition = "normal"
                conditionScreen = "normal"
            }
            else if(travel !== "yes" && symptoms !== "" && temp === "38+") {
                user2.condition = "pui"
                conditionScreen = "pui"
            }
            else if(travel !== "yes" && symptoms !== "" && temp !== "38+") {
                user2.condition = "pum"
                conditionScreen = "pum"
            }
            else {
                user2.condition = "normal"
                conditionScreen = "normal"
            }

            const newScreen = new Screen({
                user: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: new Date().toISOString(),
                age,
                address,
                mobile,
                temp,
                travel,
                symptoms: symptoms + "&" + conditionScreen,
            });

            await user2.save();
            const screen = await newScreen.save();

            context.pubsub.publish('NEW_SCREEN', {
                newScreen: screen
            });

            return screen;
        },
        
    }

};