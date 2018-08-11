// @flow
import chan from 'chan';

export type Receiver<S, T> = (val: S) => Promise<T>

function makeChan<S, T>(recv: Receiver<S, T>): Receiver<S, T> {
    const ch = chan();

    const receive = () => {
        ch((err, v) => {
            const { val, resolve, reject } = v;
            recv(val)
                .then((res) => {
                    receive();
                    resolve(res);
                })
                .catch((err) => {
                    receive();
                    reject(err);
                });
        });
    };
    receive();

    return (val: S) => {
        return new Promise((resolve, reject) => {
            ch({val, resolve, reject});
        });
    };
}

export default makeChan;
