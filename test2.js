console.clear();

if (process.argv.length < 3) {
    console.log ('Не указана запрашиваемая сумма');
    return false;
}

atm(process.argv[2]);

/**
 *  В обороте находятся банкноты k различных номиналов: a1, a2, ..., ak рублей.
 *  Банкомат должен выдать сумму в N рублей при помощи минимального количества банкнот или сообщить, что запрашиваемую сумму выдать нельзя.
 *  Будем считать, что запасы банкнот каждого номинала не ограничены.
 *  Рассмотрим такой алгоритм: будем выдавать банкноты наибольшего номинала, пока это возможно,затем переходим к следующему номиналу.
 *  Например, если имеются банкноты в 10, 50, 100, 500, 1000 рублей,
 *  то при N = 740 рублей такой алгоритм выдаст банкноты в 500, 100, 100, 10, 10, 10, 10 рублей.
 *  
 *  Реализовать алгоритм:
 *  выдать 740 рублей
 *  выдать 600 рублей
 * 
 * @parameter - запрашиваемая сумма
 */
function atm(requiredAmount) {
    const denominations = [10, 50, 100, 500, 1000];     // Номиналы банкнот в банкомате
    if (requiredAmount % denominations[0]) {
        console.log('Невозможно выдать сумму ' + requiredAmount + ' руб.');
        return false;
    }

    let residualAmount = requiredAmount;            // Остаток суммы к выдаче
    let cash = Array(denominations.length).fill(0); // Количество банкнот к выдаче 
    let outString = '';

    for (let i = denominations.length; i >= 0; i--) {
        if (residualAmount >= denominations[i]) {
            cash[i] = Math.floor(residualAmount / denominations[i]);
            residualAmount -= denominations[i] * cash[i];
            outString += (denominations[i] + ', ').repeat(cash[i]);
            if (residualAmount == 0) {
                break;
            }
        }
    }

    console.log('Запрашиваемая сумма ' + requiredAmount + ' руб.');
    console.log ('К выдаче банкноты ' + outString.slice(0, -2));
    return cash;
}

