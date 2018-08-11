import { expect } from 'chai';
import makeChan from './index';

describe('async-chan', () => {
    let ch;
    let sum = 0;
    it('should make a channel', () => {
        ch = makeChan((val) => new Promise(resolve => {
            setTimeout(() => {
                sum += val;
                resolve(sum);
            }, 50);
        }));
    });

    it('should make some calls', async () => {
        let ourSum = 0;
        let arr = [];
        let proms = [];
        for (let i = 1; i <= 20; i++) {
            ourSum += i;
            arr.push(ourSum);
            proms.push(ch(i));
        }

        expect(await Promise.all(proms)).to.deep.equal(arr);
    });

    it('should work with error', async () => {
         const ch2 = makeChan((val) => Promise.resolve(val));
         const err = await ch2(new Error('err'));
         expect(err.message).to.equal('err');
    });

    it('should handle rejection', async () => {
        const ch2 = makeChan((val) => Promise.reject(new Error(val)));
        try {
            await ch2('err');
            expect(true, 'should have failed').false;
        } catch (err) {
            expect(err.message).to.equal('err');
        }
    });
});
