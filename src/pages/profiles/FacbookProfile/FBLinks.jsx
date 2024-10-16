import { Grid } from '@mui/material';
import React from 'react';

const FBLinks = () => {
    const linksGroup1 = [
        { img: 'assets/img/word.png', name: 'Link Name 1', url: '#' },
        { img: 'assets/img/excel.png', name: 'Link Name 2', url: '#' },
        { img: 'assets/img/csv.png', name: 'Link Name 3', url: '#' },
    ];

    const linksGroup2 = [
        { img: 'assets/img/powerpoint.png', name: 'Link Name 1', url: '#' },
        { img: 'assets/img/link_ico.png', name: 'Link Name 2', url: '#' },
        { img: 'assets/img/pdf.png', name: 'Link Name 3', url: '#' },
    ];

    return (
        <section className="py-8">
            <div className="imp_links">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold"><span>Important Links</span></h2>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                    <Grid container>
        
                        {linksGroup1.map((link, index) => (
                              <Grid sx={12} md={6} lg={4}>
         
                            <div key={index} className="flex items-center">
                                {/* <img src={link.img} alt={link.name} className="w-6 h-6 mr-2" /> */}
                                <a href={link.url} className="text-lg hover:text-blue-500">{link.name}</a>
                            </div>
                            </Grid>
            ))}
             </Grid>
                    </div>

                    {/* <div className="flex flex-col items-center">
                        {linksGroup2.map((link, index) => (
                            <div key={index} className="flex items-center">
                                <img src={link.img} alt={link.name} className="w-6 h-6 mr-2" />
                                <a href={link.url} className="text-lg hover:text-blue-500">{link.name}</a>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default FBLinks;
