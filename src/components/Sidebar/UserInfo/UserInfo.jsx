import React from 'react';
import { Grid, Header, Icon, Image, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import { db } from "../../../server/firebase.js";
const UserInfo = (props) => {

    const getDropDownOptions = () => {
        return [{
            key: 'signout',
            text: <span onClick={signOut}>Sign Out</span>
        }]
    }

    const signOut = () => {
        db.auth()
            .signOut()
            .then(() => console.log("user signed out"));
    }

    const updateUserProfile = () => {
        // Example: Updating user profile in Firestore
        const userRef = db.collection('users').doc(props.user.uid);
        
        // Assume you have a field 'displayName' in your Firestore document
        userRef.update({
            displayName: "New Display Name"
        }).then(() => {
            console.log("User profile updated successfully");
        }).catch((error) => {
            console.error("Error updating user profile: ", error);
        });
    }

    if (props.user) {
        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row className="userinfo_grid_row">
                        <Header inverted as="h2">
                            <Icon name="slack" />
                            <Header.Content>Slack</Header.Content>
                        </Header>
                        <Header className="userinfo_displayname" inverted as="h4">
                            <Dropdown
                                trigger={
                                    <span>
                                        <Image src={props.user.photoURL} avatar></Image>
                                        {props.user.displayName}
                                    </span>
                                }
                                options={getDropDownOptions()}
                            >
                            </Dropdown>
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
    return null;
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(UserInfo);
