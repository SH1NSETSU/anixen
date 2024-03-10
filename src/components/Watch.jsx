import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEpisode from '../hooks/useEpisode';
import ReactPlayer from 'react-player';
import Loading from './Loading';
import { Alert, Button, ButtonGroup, Card, Container, DropdownButton, DropdownItem } from 'react-bootstrap';

const Watch = () => {
    const { epID } = useParams();
    const episode = useEpisode(epID);
    const navigate = useNavigate();

    const prev = () => {
        navigate('/watch/' + episode.prev);
        window.location.reload();
    };

    const info = () => {
        navigate('/info/' + localStorage.getItem('watching'));
    };

    const next = () => {
        navigate('/watch/' + episode.next);
        window.location.reload();
    };

    const download = () => {
        const apiKey = '228774320d0d51ccc97dedbf3cefb52d';
        const userId = '467004';
        const downloadUrl = episode.download;

        const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `https://bc.vc/api.php?key=${apiKey}&uid=${userId}&url=${encodeURIComponent(downloadUrl)}`;

        fetch(corsAnywhereUrl + apiUrl)
            .then(response => response.json())
            .then(data => {
                const shortenedUrl = data.shortenedUrl;
                window.location.href = shortenedUrl;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    function verify() {
        window.onpopstate = function () {
            location.reload();
        };
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <Container style={{ maxWidth: '1000px' }}>
            {episode.ep == undefined && <Loading />}
            <br />
            <Card className='mt-5 text-center' bg='dark' text='light'>
                <Card.Header>{epID.toUpperCase()}</Card.Header>
                <Card.Body>
                    <ReactPlayer
                        className='video'
                        url={episode.ep?.url}
                        playing
                        controls={true}
                        volume={0.70}
                        pip
                        width={'100%'}
                        height={'450px'}
                    />
                </Card.Body>
                <Card.Footer className=''>
                    <ButtonGroup>
                        <Button variant='light' style={episode.prev.includes('episode-0') ? { display: 'none' } : null} onClick={prev}>
                            Prev EP
                        </Button>
                        <DropdownButton variant='light' as={ButtonGroup} title={<img width={'20px'} src='/list.png' />} id='bg-nested-dropdown' className='rounded'>
                            <DropdownItem onClick={info} eventKey='1'>
                                Episode List
                            </DropdownItem>
                            <DropdownItem onClick={download} eventKey='2'>
                                Download Episode
                            </DropdownItem>
                        </DropdownButton>
                        <Button variant='light' style={episode.next.includes(episode.episodes + 1) ? { display: 'none' } : null} onClick={next}>
                            Next EP
                        </Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
            <br />
            <Container className='d-flex justify-content-center'>
                <Alert variant='info' className='text-center' style={{ width: '320px' }}>
                    video quality will automatically improve
                </Alert>
            </Container>
        </Container>
    );
};

export default Watch;
