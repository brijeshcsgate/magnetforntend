import React from 'react'
const SingleTestimonial = ({testimonial}) => {
    return (
        <div >
            <div style={{ display: "flex", gap: '2rem' }} className='pb-2'>
                <div>
                    <h5>{testimonial?.name}</h5>
                </div>
            </div>
            <hr />
            <div className="text-secondary pt-2">
            {testimonial?.description} </div>
        </div>
    )
}

export default SingleTestimonial
