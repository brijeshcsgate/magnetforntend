import { Grid } from '@mui/material';
import React from 'react';

const FBLinks = ({documentsLinks}) => {
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
        <section className="fbmainbody ">
            <div className="fbimp_links mn-pad mx-auto px-2 pb-5">
            <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="fbheader-section pt-3 px-3 text-start">
            <h2 className="text-3xl font-semibold">
               Important <span className="text-blue-500">Links</span>
              </h2>
            </div>
          </div>
        </div>
                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                    <Grid container>
        
                    {documentsLinks?.map((link, index) => (
                              <Grid sx={12} md={6} lg={3}>
         
                            <div key={index} className="flex items-center px-5">
                                <img src={`${"/img/link_ico.png"}`} alt={link?.name} className="w-6 h-6 mr-2" />
                                <a href={link.url} className="text-lg hover:text-blue-500">{link?.name}</a>
                            </div>
                            </Grid>
            ))}
             </Grid>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FBLinks;
