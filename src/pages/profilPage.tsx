import { Helmet } from "react-helmet"
import { ProfileComponent } from "../components/profile/profile"
import { useParams } from "react-router-dom"

export const ProfilePage = () => {
    const { userId } = useParams()
    
    return(
        <>
        <Helmet>
            <title>RentEase</title>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
        </Helmet>
        <ProfileComponent userId={userId} />
        </>
    )
}