const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {

    const date = new Date(Date.parse("2022-10-01"))
    const date2 = new Date(Date.parse("2022-10-02"))
    const date3 = new Date(Date.parse("2021-09-09"))
    // Add your code here
    const createMovie = await prisma.movie.create({
        data: {
                title: 'Moon',
                runtimeMins: 100,
                screenings: {
                    create: [
                        {
                            startsAt: date,
                            screen: {
                                connectOrCreate: {
                                    where: {
                                        id: 1
                                        },
                                    create: {
                                            number: 2
                                        }
                                    }
                            }
                        },
                        {
                            startsAt: date2,
                            screen: {
                                connectOrCreate: {
                                    where: {
                                        id: 2
                                        },
                                    create: {
                                            number: 1
                                        }
                                    }
                            }
                        }
                    ]
                }
            }
    });

    const createdMovie2 = await prisma.movie.create({
    data: {
        title: 'Spoderman',
        runtimeMins: 165,
        screenings: {
            create: [
                {
                    startsAt: date3,
                    screen: {
                        connectOrCreate: {
                            where: {
                                id: 2
                                },
                            create: {
                                    number: 1
                                }
                            }
                        }
                }
        ]
        }
    }
    })
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: '07732106166',
                    email: 'alice@gmail.com'
                }
            },
            tickets: {
                create: [
                    {
                        screening: {
                            connect: {id: 1}
                        }
                    },
                    {
                        screening: {
                            connect: {id: 2}
                        }
                    }

            ]
            }
        }
    });
    /*
    const createdScreen = await prisma.screen.create({
        data: [{
                number: 1,
                screenings: {
                    connect: [{id:3},{id:2}]
                }
            },
            {
                number: 2,
                screenings: {
                    connect: [{id:1}]
                }
            }
        ]
    });
    */
/*
    const createScreening = await prisma.screening.create({
        data: {
                startsAt: date
            }
    });*/
    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
