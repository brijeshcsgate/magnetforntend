import React from 'react'
const SingleTestimonial = () => {
    return (
        <div >
            <div style={{ display: "flex", gap: '2rem' }}>
                <div style={{ with: "50px", height: "50px", borderRadius: "50%" }}>
                    <img style={{ borderRadius: "50%" }} width="100%" height="100%" src={process.env.PUBLIC_URL + '/imgV4/profile-img.jpg'} alt="Shahista-profile" />
                </div>
                <div>
                    <h5>{`SHAHISTA NAAZ`}</h5>
                    <p className="text-secondary">{`Freelancer`}</p>
                </div>
            </div>
            <hr />
            <div className="text-secondary">Great designer! he finished our work wonderfully and just in
                time. thanks for everything. </div>
        </div>
    )
}

export default SingleTestimonial
