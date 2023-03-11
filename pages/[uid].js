const UserDetailsPage = (props) => {
    const { id } = props


    return ( 
        <>
            <h1>{id}</h1>
        </>
    );
}

export async function getServerSideProps (context) {
    const {params , req ,res} = context

    return {
        props : {
            id : `UserID-${params.uid}`
        }
    }
}

export default UserDetailsPage;