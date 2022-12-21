import * as S from "./style";

const Logo = ({...props}) => {
    return (
        <S.Div>
            <S.Logo href="/" {...props}>
                Rama Can
            </S.Logo>
            <S.AnimatedWave>👋</S.AnimatedWave>
        </S.Div>
    );
};

export default Logo;
