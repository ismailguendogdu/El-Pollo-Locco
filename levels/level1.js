const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],

    [
        new Cloud()
    ],

    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
    ],

    [
        new SalsaBottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png',500),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',460),
        new SalsaBottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png',360),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',100),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',700),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',800),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',850),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',880),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',750),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',780),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',900),
        new SalsaBottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png',950),
        new SalsaBottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png',880)

    ],

    [
        new Coins('img/8_coin/coin_1.png',100),
        new Coins('img/8_coin/coin_1.png',250),
        new Coins('img/8_coin/coin_1.png',350),
        new Coins('img/8_coin/coin_1.png',450),
        new Coins('img/8_coin/coin_1.png',550),
        new Coins('img/8_coin/coin_1.png',650),
        new Coins('img/8_coin/coin_1.png',750),
        new Coins('img/8_coin/coin_1.png',850),
        new Coins('img/8_coin/coin_1.png',950)
    ]

);